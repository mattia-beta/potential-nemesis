//
//  Principale.h
//  nemesis
//
//  Created by mattia benedetti on 02/06/13.
//  Copyright (c) 2013 mattia benedetti. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <CoreLocation/CoreLocation.h>


@interface Principale : UIViewController <CLLocationManagerDelegate>
{
    MKMapView *mapView;
    CLLocationManager *locationManager;
    NSString *latitudine;
    NSString *longitudine;
}

@property (strong, nonatomic) IBOutlet MKMapView *mapView;

-(IBAction) do_report:(id)sender;

@end
